/* eslint-disable @next/next/no-img-element */

export const Nav = () => {

    return (
        <nav className="px-[3.6rem] py-6">
            <a
                className="group">
                <img src="/images/logo.png" className="h-[2.8rem] drop-shadow-logo group-hover:drop-shadow-logo-hover group-hover:scale-[102%] transition-all duration-200 ease-in-out cursor-pointer" alt="Netflix Logo" />
            </a>
        </nav>
    )
}