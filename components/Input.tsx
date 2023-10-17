
import {forwardRef} from "react";

import React from 'react'
import { twMerge } from "tailwind-merge";

interface InputProps 
extends React.InputHTMLAttributes<HTMLInputElement> {}


const Input = forwardRef<HTMLInputElement, InputProps>(({
    className,
    disabled,
    type,
    ...props
}, ref) => {
    return (
        <input
        type={type}
        className={twMerge(
            `bg-neutral-700
            rounded-md
            border
            border-transparent
            w-full
            px-3
            py-3
            flex
            text-sm
            file:border-0
            file:bg-transparent
            file:text-sm
            file:font-medium
            placeholder:text-neutral-400
            disabled:cursor-not-allowed
            disabled:opacity-50
            focus:outline-none`,
            className
        )}
        disabled={disabled}
        ref={ref}
        {...props}
        />
    )
        })

Input.displayName = 'Input'

export default Input
