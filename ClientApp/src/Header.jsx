import React from 'react'

export function Header() {
  return (
    <div className="headerBackground">
      <header>
        <nav>
          <ul>
            <div>
              <li>
                <img
                  src="https://media-exp1.licdn.com/dms/image/C560BAQHz2Fd7R9g-qQ/company-logo_200_200/0?e=1610582400&v=beta&t=azWNdhGAHaPrUuR8nheeHM2RFqv3DdvDEeu0usJP5R8"
                  alt="PoeLogo"
                />
              </li>
            </div>
            <li>
              <a href="/home">Home</a>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  )
}
