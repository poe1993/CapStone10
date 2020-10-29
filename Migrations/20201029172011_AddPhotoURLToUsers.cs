using Microsoft.EntityFrameworkCore.Migrations;

namespace CapStone10.Migrations
{
    public partial class AddPhotoURLToUsers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PhotoURL",
                table: "Users",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PhotoURL",
                table: "Users");
        }
    }
}
