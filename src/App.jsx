import React, { useState, useEffect } from 'react'
import TechStack from './TechStack'
import Socials from './Socials'
import Stats from './Stats'
import GifPicker from 'gif-picker-react'
import MarkdownPreview from '@uiw/react-markdown-preview';
import './styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const tenorApiKey = import.meta.env.VITE_TENOR_API_KEY

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark'
    } else {
      return false
    }
  });
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [addImage, setAddImage] = useState('')
  const [techStack, setTechStack] = useState([])
  const [socials, setSocials] = useState({
    x: '',
    instagram: '',
    reddit: '',
    codepen: '',
    medium: '',
    substack: '',
    kaggle: '',
    youtube: '',
    hackerearth: '',
    hackerrank: '',
    leetcode: '',
    stackoverflow: ''
  })
  const statsDisplay = {
        'github stats': `![](https://github-readme-stats.vercel.app/api?username=${username}&theme=dark&hide_border=false&include_all_commits=false&count_private=false)`, 
        'streak stats': `![](https://nirzak-streak-stats.vercel.app/?user=${username}&theme=dark&hide_border=false)`, 
        'most used languages': `![](https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&theme=dark&hide_border=false&include_all_commits=false&count_private=false&layout=compact)`
  }
  const [stats, setStats] = useState([])
  const [step, setStep] = useState(1)
  const maxSteps = 7
  const [markdownCode, setMarkdownCode] = useState('')
  const [showPreview, setShowPreview] = useState(false)
  const [showCode, setShowCode] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [selectGif, setSelectGif] = useState(false)

  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    document.documentElement.style.setProperty('--primary', darkMode ? 'rgba(0, 0, 0, 0.9)' : 'white');
    document.documentElement.style.setProperty('--secondary', darkMode ? 'white' : 'rgba(0, 0, 0, 0.69)');
  }, [darkMode]);

  
  const socialsImgPath = 'https://raw.githubusercontent.com/arnav123098/profile-readme-maker/main/src/assets/socials/';
  const techStackImgPath = 'https://raw.githubusercontent.com/arnav123098/profile-readme-maker/main/src/assets/tech-stack/';

  useEffect(() => {
    // build markdown
    const sections = []

    const head = []
    if (addImage) head.push(`![display image](${addImage})`);
    head.push(`# Hi! I'm ${name || '...'}`)
    if (bio.trim()) head.push(bio);

    sections.push(head.join('\n'))

    const socialsLinks = Object.keys(socials)
        .filter(k => socials[k])
        .map(k => `<a href='https://${k + (k === 'codepen' ? '.io/' : '.com/') + socials[k]}'><img src='${socialsImgPath + k + '.svg'}' alt='${k}' height=40 width=40 /></a>`)
        .join(' ')
    if (socialsLinks) sections.push(`## Connect with me\n` + socialsLinks)

    if (techStack.length) sections.push(`## My tech stack\n` + 
        techStack
        .map(k => `<img src='${techStackImgPath + k.toLowerCase() + '.svg'}' alt='${k}' height=40 width=40 />`)
        .join(' '))

    if (stats.length) sections.push(`## Github stats\n` +
        stats
        .map(k => `${statsDisplay[k]}`)
        .join('\n\n'))
    
    setMarkdownCode(sections.join('\n\n---\n\n'))
  }, [username, bio, addImage, techStack, socials, stats, statsDisplay])

  function StepChanger({step, setStep}) {
    return (
      <div id='step-changer'>
        {step !== 1 && <button id='back' className='hover next-back' onClick={() => {
          if (step === 7) setIsCopied(false);
          setStep(prev => prev-1);
          setShowPreview(false)
          }}>back</button>}
        {step !== maxSteps && <button className='hover next-back' onClick={() => {
          setStep(prev => prev+1);
          if (step === 6) {
            setShowPreview(true);
          }
        }}>next</button>}
      </div>
    )
  }

  const handleTechStack = ({target}) => {
    setTechStack(prev => target.checked ? [...prev, target.name] : prev.filter(i => i !== target.name))
  }

  const handleSocials = ({target}) => {
    setSocials(prev => ({...prev, [target.name]: target.value}))
  }

  const handleStats = ({target}) => {
    setStats(prev => target.checked ? [...prev, target.name] : prev.filter(i => i !== target.name))
  }

  const handleKeyDown = ({key}) => {
    if (key === 'Enter' & step !== maxSteps) {
      setStep(prev => prev+1)
    }
  }

  return (
    <div id='body'>
      <div>
      <button id='dark-mode-toggle' onClick={() => setDarkMode(prev => !prev)}>{darkMode ? <i className="bi bi-brightness-high"></i> : <i className="bi bi-moon"></i>}</button>
      {
        step === 1 && 
        <div id='home'>
          <a id='star-on-github' href=''><FontAwesomeIcon icon={faGithub} /> Star on Github</a>
          <h1>make your README.md</h1>
          <input className='text-input' id='username-input' name='username' placeholder='your github username*' value={username} onChange={({target}) => setUsername(target.value)} onKeyDown={handleKeyDown} />
          <StepChanger step={step} setStep={setStep} />
        </div>
      }
      {
        step === 2 &&
        <div className='field'>
          <input className='text-input' name='name' placeholder='your name*' value={name} onChange={({target}) => setName(target.value)} onKeyDown={handleKeyDown} />
          <textarea className='text-input' name='bio' placeholder='write about yourself' value={bio} onChange={({target}) => setBio(target.value)} onKeyDown={handleKeyDown} />
          <StepChanger step={step} setStep={setStep} />
        </div>
      }
      {
        step === 3 &&
        <div className='field'>
          <h2>select a gif to include in the readme or paste image url directly</h2>
          <button id='gif-btn' onClick={() => {setSelectGif(prev => !prev)}} className='hover'>{selectGif ? 'cancel' : 'browse gif'}</button>
          {selectGif && <GifPicker id='gif-picker' tenorApiKey={tenorApiKey} onGifClick={gif => setAddImage(gif.url)} />}
          <input className='text-input' id='image-input' name='image' placeholder='or paste image url' value={addImage} onChange={({target}) => setAddImage(target.value)} onKeyDown={handleKeyDown} />
          <StepChanger step={step} setStep={setStep} />
        </div>
      }
      {
        step === 4 &&
        <div className='field'>
          <TechStack handleTechStack={handleTechStack} />
          <StepChanger step={step} setStep={setStep} />
        </div>
      }
      {
        step === 5 &&
        <div className='field'>
          <Socials socials={socials} handleSocials={handleSocials} />
          <StepChanger step={step} setStep={setStep} />
        </div>
      }
      {
        step === 6 &&
        <div className='field'>
          <StepChanger step={step} setStep={setStep} />
          <Stats username={username} stats={statsDisplay} handleStats={handleStats} />
        </div>
      }
      </div>

      {
        step !== 1 && 
        <div>
            {
          step === 7 &&
          <>
            <div id='copy-code-section'>
              <button id='show-code' className='hover' onClick={() => {setShowCode(prev => !prev)}}>{showCode ? 'hide code' : 'show code'}</button>
              <button id='copy-btn' className='hover' onClick={async () => {
                      await navigator.clipboard.writeText(markdownCode);
                      return setIsCopied(true);
                    }}>{isCopied ? 'copied!' : 'copy code'}</button>
              {
                  showCode &&
                  <div id='md-code'>
                    <textarea value={markdownCode} readOnly />
                  </div>
              }
            </div>
            <StepChanger step={step} setStep={setStep} />
          </>
        }
          <button id='preview-btn' className='hover' onClick={() => {setShowPreview(prev => !prev)}}>{showPreview ? 'hide preview' : 'show preview'}</button>
          {
            showPreview &&
            <div id='md-preview'>
              <MarkdownPreview source={markdownCode} />
            </div>
          }
        </div>
      }
    </div>
  )
}

export default App
