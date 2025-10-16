import React from "react"

const languages = ['C', 'C++', 'C#', 'Assembly', 'Go', 'JavaScript', 'TypeScript', 'Python', 'Java', 'Kotin', 'Dart', 'Swift', 'CSS', 'HTML', 'Lua', 'Rust', 'Objective-C', 'PHP', 'PERL', 'R', 'Ruby', 'Bash', 'Zig']
const frameworks_and_libraries = ['.NET', 'React', 'Vue', 'Svelte', 'Angular', 'NodeJS', 'ExpressJS', 'Bootstrap', 'Tailwind', 'Sass', 'Redux', 'Flutter', 'Flask', 'Laravel', 'NextJs', 'OpenGL', 'WebGL', 'React Native', 'Strapi', 'Three.JS', 'QT', 'Rails', 'Electron', 'Chart.JS', 'D3']
const servers = ['Apache', 'NGINX', 'Jenkins']
const databases = ['Firebase', 'MySQL', 'Postgres', 'MongoDB', 'Redis', 'Realm', 'Supabase', 'SQLite']
const game_engines = ['Unity', 'Unreal Engine']
const ml = ['PyTorch', 'Keras', 'Tensorflow', 'Huggingface', 'Scikit-Learn', 'NumPy', 'Matplotlib', 'SciPy', 'Pandas', 'Seaborn']
const others = ['AWS', 'Github', 'Git', 'Gitlab', 'Gitpod', 'Babel', 'Docker', 'Eslint', 'Kubernetes', 'Notion', 'Obsidian', 'Linux', 'Raspberry Pi', 'Postman', 'OpenCV', 'Figma', 'Photoshop', 'Adobe XD', 'Framer', 'Blender', 'Vercel', 'Netlify', 'Wordpress', 'Arduino']

function TechStack({handleTechStack}) {
    const techStack = {
        languages,
        frameworks_and_libraries,
        servers,
        databases,
        game_engines,
        ml,
        others
    }
    return (
        <div id='tech-stack-field'>
            {Object.keys(techStack)
                .map(list => {
                    return (
                        <div key={list} className='tech-stack-category'>
                            <h2>{list}</h2>
                            {techStack[list].map(item => 
                                <div key={item} className='tech-stack-checkbox'>
                                    <input type='checkbox' name={item} onChange={handleTechStack}/>
                                    {item}
                                </div>
                        )}
                    </div>
                )}
            )}
        </div>
    )
}

export default TechStack
