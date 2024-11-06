import React from 'react'
import { Button } from '@material-tailwind/react';

function ButtonComponent({ text }) {
    return (
        <div className="flex justify-center mt-3">
            <Button
                type="submit"
                className="btn bg-[#0076CE] text-white heading-text-size hover:border hover:bg-slate-500 rounded px-8 py-2"
            >
                {text}
            </Button>
        </div>
    )
}

export default ButtonComponent;