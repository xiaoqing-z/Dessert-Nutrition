import React, { ReactNode } from "react";
import buttonStyle from "./style";

interface ButtonProps {
    type?: string;
    children: ReactNode;
}

function Button({ type, children, ...props }: ButtonProps) {
    return (
        <button className={buttonStyle[type]} {...props} >
            {children}
        </button>
    );
}

export default Button;
