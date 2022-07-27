import React from 'react'

type InputWithIconProps = {icon?: JSX.Element} & JSX.IntrinsicElements['input'] 

const InputWithIcon: React.FC<InputWithIconProps> = ({icon, ref, ...props}) => {
    return (<form>
    {icon && <div>{icon}</div>}
    <input {...props} />
    </form>);
}

export default InputWithIcon