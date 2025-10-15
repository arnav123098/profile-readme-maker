import React from "react";

function Socials({socials, handleSocials}) {
    return (
        <>
            {Object.keys(socials).map(social => 
                <input key={social} className='social' type='text' name={social} placeholder={`your ${social} username`} value={socials[social]} onChange={handleSocials}/>
            )}
        </>
    )
}

export default Socials
