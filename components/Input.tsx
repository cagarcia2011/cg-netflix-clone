
interface InputProps {
    id: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    value: string,
    label: string,
    type?: string
}

export const Input: React.FC<InputProps> = ({id, onChange, value, label, type}) => {

    return (
        <div className="relative cursor-text">
            <input 
                id={id} 
                value={value}
                onChange={onChange}
                type={type}
                className="sign-in-input peer" 
                placeholder=" "/>
            <label 
                htmlFor={id}
                className="sign-in-label cursor-text">
                    {label}
            </label>
        </div>
    )
}