using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CapStone10.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace CapStone10.Controllers
{
    // All of these routes will be at the base URL:     /api/Policies
    // That is what "api/[controller]" means below. It uses the name of the controller
    // in this case PoliciesController to determine the URL
    [Route("api/[controller]")]
    [ApiController]
    public class PoliciesController : ControllerBase
    {
        // This is the variable you use to have access to your database
        private readonly DatabaseContext _context;

        // Constructor that recives a reference to your database context
        // and stores it in _context for you to use in your API methods
        public PoliciesController(DatabaseContext context)
        {
            _context = context;
        }


        private int GetCurrentUserId()
        {
            // Get the User Id from the claim and then parse it as an integer.
            return int.Parse(User.Claims.FirstOrDefault(claim => claim.Type == "Id").Value);
        }

        // GET: api/Policies
        //
        // Returns a list of all your Policies
        //
        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<IEnumerable<Policy>>> GetPolicies()
        {
            // Uses the database context in `_context` to request all of the Policies, sort
            // them by row id and return them as a JSON array.
            return await _context.Policies.Where(policy => policy.UserId == GetCurrentUserId()).OrderBy(row => row.Id).ToListAsync();
        }

        // GET: api/Policies/5
        //
        // Fetches and returns a specific policy by finding it by id. The id is specified in the
        // URL. In the sample URL above it is the `5`.  The "{id}" in the [HttpGet("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        [HttpGet("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<Policy>> GetPolicy(int id)
        {
            // Find the policy in the database using `FindAsync` to look it up by id
            var policy = await _context.Policies.FindAsync(id);

            // If we didn't find anything, we receive a `null` in return
            if (policy == null)
            {
                // Return a `404` response to the client indicating we could not find a policy with this id
                return NotFound();
            }

            //  Return the policy as a JSON object.
            return policy;
        }

        // PUT: api/Policies/5
        //
        // Update an individual policy with the requested id. The id is specified in the URL
        // In the sample URL above it is the `5`. The "{id} in the [HttpPut("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        // In addition the `body` of the request is parsed and then made available to us as a Policy
        // variable named policy. The controller matches the keys of the JSON object the client
        // supplies to the names of the attributes of our Policy POCO class. This represents the
        // new values for the record.
        //
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPolicy(int id, Policy policy)
        {

            var policiesBelongsToUser = await _context.Policies.AnyAsync(policy => policy.Id == id && policy.UserId == GetCurrentUserId());
            if (!policiesBelongsToUser)
            {
                // Make a custom error response
                var response = new
                {
                    status = 401,
                    errors = new List<string>() { "Not Authorized" }
                };
                // Return our error with the custom response
                return Unauthorized(response);
            }
            // If the ID in the URL does not match the ID in the supplied request body, return a bad request
            if (id != policy.Id)
            {
                return BadRequest();
            }

            // Tell the database to consider everything in policy to be _updated_ values. When
            // the save happens the database will _replace_ the values in the database with the ones from policy
            _context.Entry(policy).State = EntityState.Modified;

            try
            {
                // Try to save these changes.
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                // Ooops, looks like there was an error, so check to see if the record we were
                // updating no longer exists.
                if (!PolicyExists(id))
                {
                    // If the record we tried to update was already deleted by someone else,
                    // return a `404` not found
                    return NotFound();
                }
                else
                {
                    // Otherwise throw the error back, which will cause the request to fail
                    // and generate an error to the client.
                    throw;
                }
            }

            // return NoContent to indicate the update was done. Alternatively you can use the
            // following to send back a copy of the updated data.
            //
            // return Ok(policy)
            //
            return NoContent();
        }

        // POST: api/Policies
        //
        // Creates a new policy in the database.
        //
        // The `body` of the request is parsed and then made available to us as a Policy
        // variable named policy. The controller matches the keys of the JSON object the client
        // supplies to the names of the attributes of our Policy POCO class. This represents the
        // new values for the record.
        //
        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<Policy>> PostPolicy(Policy policy)
        {
            policy.UserId = GetCurrentUserId();

            // Indicate to the database context we want to add this new record
            _context.Policies.Add(policy);
            await _context.SaveChangesAsync();

            // Return a response that indicates the object was created (status code `201`) and some additional
            // headers with details of the newly created object.
            return CreatedAtAction("GetPolicy", new { id = policy.Id }, policy);
        }

        // DELETE: api/Policies/5
        //
        // Deletes an individual policy with the requested id. The id is specified in the URL
        // In the sample URL above it is the `5`. The "{id} in the [HttpDelete("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        [HttpDelete("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> DeletePolicy(int id)
        {
            // Find this policy by looking for the specific id
            var policy = await _context.Policies.FindAsync(id);
            if (policy == null)
            {
                // There wasn't a policy with that id so return a `404` not found
                return NotFound();
            }

            // Tell the database we want to remove this record
            _context.Policies.Remove(policy);

            // Tell the database to perform the deletion
            await _context.SaveChangesAsync();

            // return NoContent to indicate the update was done. Alternatively you can use the
            // following to send back a copy of the deleted data.
            //
            // return Ok(policy)
            //
            return NoContent();
        }

        // Private helper method that looks up an existing policy by the supplied id
        private bool PolicyExists(int id)
        {
            return _context.Policies.Any(policy => policy.Id == id);
        }
    }
}
