import React from 'react'
import './error-message.scss'

type Props = {
    error: string
}

const ErrorMessage: React.FC<Props> = ({ error = 'Falha' }: Props) => {
    return (
        <div className='errorWrap'>{error}</div>
    )
}

export default ErrorMessage
