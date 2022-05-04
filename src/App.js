import './App.css';
import React, { useState } from 'react'

function App() {
  const [input, setInput] = useState('')
  const [parsedText, setParsedText] = useState([])
  const [bubbles, setBubbles] = useState(null)

  return (
    <div className="App">

      {/* Champ "invisible" pour intéragir avec le texte et les bulles  */}
      <textarea style={{ backgroundColor: 'green' }} type='textarea' value={input} onChange={(e) => {
        setInput(e.target.value);
        if (input.includes('_@_')) {
          const value = prompt('New value')
          setParsedText([...parsedText, { id: parsedText.length + 1, value: ' ' + input.replace('_@_', ''), selected: false }])
          setInput(' ')
          bubbles !== null
            ? setBubbles([...bubbles, { id: bubbles.length + 1, value: value }])
            : setBubbles([{ id: 1, value: value }])
        }
      }} />

      {/* Corps du texte avec intégration des bulles et de la valeur du champ invisible */}
      <div style={{ backgroundColor: 'grey' }}>
        {parsedText.length > 0 &&
          parsedText.map((text) => {
            return (
              <>
                <span data-text-id={text.id}
                  onClick={(e) => {
                    setInput(e.target.innerHTML)


                    let newParsedText = parsedText
                    newParsedText = newParsedText.map(text => {
                      return { id: text.id, value: text.value, selected: false }
                    })

                    newParsedText.splice(text.id - 1, 1, { id: text.id, value: text.value, selected: true })

                    setParsedText(newParsedText)
                  }}>{text.selected ? input : text.value}</span>
                <span style={{ backgroundColor: 'black', color: 'white' }}>{bubbles.map(((bubble) => {
                  return text.id === bubble.id && bubble.value
                }))}
                </span>
              </>)
          })
        }
        <span>{input}</span>
      </div>


      {/* Bouton de suppression bubble */}
      <h1>Remove bubbles</h1>
      {bubbles !== null && bubbles.map((bubble) => {
        return (
          <>
            <h2>Bubble n°{bubble.id}</h2>
            <h2>Value: {bubble.value}</h2>
            <button value={bubble.id} onClick={(e) => {

              let buttonId = parseInt(e.target.value)
              let newText = ''
              let newBubbles = bubbles.filter(bubble => {
                return bubble.id !== buttonId
              })

              let newParsedText = [...parsedText]

              let removedText = newParsedText.splice(buttonId - 1, 2)

              for (const text of removedText) {
                newText += text.value
                newText = newText.replace('  ', ' ')
              }

              newParsedText.splice(buttonId - 1, 0, { id: buttonId, value: newText, selected: false })

              newBubbles = newBubbles.map((bubble, index) => {
                let id = bubble.id
                if (id !== index + 1) {
                  id = index + 1
                }
                return { id, value: bubble.value }
              })

              newParsedText = newParsedText.map((text, index) => {
                let id = text.id
                if (id !== index + 1) {
                  id = index + 1
                }
                return { id, value: text.value, selected: false }
              })

              setParsedText(newParsedText)
              setBubbles(newBubbles)
            }}>{bubble.value}</button>
          </>
        )
      })}
    </div>
  );
}

export default App;
