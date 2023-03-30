interface NavbarItemProps {
    label: string;
    active?: boolean;
}

export const NavbarItem: React.FC<NavbarItemProps> = ({ label, active }) => {
    return (
        <div className={active ? 'text-white cursor-default' : 'text-gray-500 hover:text-gray-300 cursor-pointer transition'}>
            {label}
        </div>
    )
}