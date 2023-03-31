interface NavbarItemProps {
    label: string;
    active?: boolean;
    handleNavigation?: () => void
}

export const NavbarItem: React.FC<NavbarItemProps> = ({ label, active, handleNavigation }) => {
    return (
        <div onClick={() => handleNavigation && !active && handleNavigation()} className={active ? 'text-white cursor-default' : 'text-gray-500 hover:text-gray-300 cursor-pointer transition'}>
            {label}
        </div>
    )
}