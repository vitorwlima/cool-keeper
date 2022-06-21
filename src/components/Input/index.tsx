import { useField } from '@unform/core'
import { DetailedHTMLProps, FC, InputHTMLAttributes, useEffect, useRef } from 'react'

interface Props {
  name: string
  label?: string
}

type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & Props

export const Input: FC<InputProps> = ({ name, label, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const { fieldName, defaultValue, registerField, error } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: (ref) => {
        return ref.current.value
      },
      setValue: (ref, value) => {
        ref.current.value = value
      },
      clearValue: (ref) => {
        ref.current.value = ''
      },
    })
  }, [fieldName, registerField])

  return (
    <div>
      {label && (
        <label htmlFor={fieldName} className='label label-text'>
          {label}
        </label>
      )}

      <input
        id={fieldName}
        ref={inputRef}
        defaultValue={defaultValue}
        className={`input input-bordered w-full ${rest.className || ''}`}
        {...rest}
      />

      {error && <p className='label-text mt-4 text-red-400'>{error}</p>}
    </div>
  )
}
