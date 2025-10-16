import React from "react";
import MarkdownPreview from '@uiw/react-markdown-preview';

function Stats({statList, stats, handleStats}) {
    
    return (
        <>  
            {/* add options like border, theme etc. */}
            <div className="stat-input">
            {Object.keys(stats).map(stat => {
                return (
                    <div key={stat}>
                        <input type="checkbox" name={stat} onChange={handleStats} checked={statList.includes(stat)} />
                        {stat}
                        <MarkdownPreview className="stat-md" source={stats[stat]} />
                    </div>
                )
            }
            )}
            </div>
        </>
    )
}

export default Stats
