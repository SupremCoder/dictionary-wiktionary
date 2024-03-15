document.addEventListener('DOMContentLoaded', () => {
    const section = document.querySelector('.section')
    const inputSearch = document.querySelector('.search_field');
    const wordTitle = document.querySelector('.word_title')
    const pronunciationOuput = document.querySelector('.word_spelling');
    const wordType = document.querySelector('.word_type_title')
    const wordMeaning = document.querySelector('.word_meaning_title')
    const definitionsOutput = document.querySelector('.word_definitions ul');
    const audioContainer = document.querySelector('.pronunciation_btn');

    document.querySelector(".search_field").addEventListener("keypress", async (event) => {
        if (event.key === "Enter") {
            event.preventDefault();

            const word = inputSearch.value;

            try {

                // if (!word.trim()) {
                //     // If input is blank, display error message and outline input in red
                //     input.classList.add('error');
                //     errorSpan.textContent = 'Whoops, can’t be empty…';
                //     return;
                // } else {
                //     // If input is not blank, remove error message and reset input style
                //     input.classList.remove('error');
                //     errorSpan.textContent = '';
                // }

                const response = await fetch(`/wiktionary/${word}`);
                const data = await response.json();
                console.log('Data:', data);
                // Check if the data keys have undefined values
                if (Object.values(data).some(value => value !== undefined)) {
                    // Word itself
                    wordTitle.textContent = `${word}`
                    // Render pronunciation
                    pronunciationOuput.textContent = `${data.pronunciation}`;
                    console.log(data)
                    // Render word type
                    wordType.textContent = `${data.word_type}`
                    console.log(data.word_type);
                    wordMeaning.textContent = 'Meaning'
                    // Render definitions
                    definitionsOutput.innerHTML = '';
                    data.definitions.forEach((definition, index) => {
                        if (index < 3) {
                            const definitionItem = document.createElement('li');
                            definitionItem.textContent = `${index + 1}. ${definition.split("\n", 1)[0]}`;
                            definitionsOutput.appendChild(definitionItem);
                        }
                    });


                    if (data.audioSrc) {
                        // Display audio player with loading message
                        audioContainer.innerHTML = '<p>Loading audio...</p>';

                        // Fetch audio data asynchronously
                        const audioResponse = await fetch(data.audioSrc);
                        if (audioResponse.ok) {
                            // Extract audio blob from response
                            const audioBlob = await audioResponse.blob();
                            // Create audio element
                            const audioElement = document.createElement('audio');
                            audioElement.controls = true;
                            // Create source element
                            const sourceElement = document.createElement('source');
                            sourceElement.src = URL.createObjectURL(audioBlob);
                            sourceElement.type = 'audio/ogg';
                            // Append source element to audio element
                            audioElement.appendChild(sourceElement);
                            // Replace loading message with audio element
                            audioContainer.innerHTML = '';
                            audioContainer.appendChild(audioElement);
                        } else {
                            // If fetching audio fails, display error message
                            audioContainer.innerHTML = '<p>Error loading audio</p>';
                        }
                    } else {
                        // If audio source URL is not available, display message
                        audioContainer.innerHTML = '<p>No audio available</p>';
                    }
                } else {
                    section.innerHTML = `
                        <div class="not_found">
                            <div class="sad_emoji">
                                &#x1F615;
                            </div>
                            <div class="not_found_title">
                                No Definitions Found
                            </div>
                            <div class="not_found_text">
                                Sorry pal, we couldn't find definitions for the word you were looking for. You can try the search again at later time or head to the web instead.
                            </div>
                        </div>
                    `
                }

            } catch (error) {
                console.error(error);
                definitionsOutput.textContent = 'Error fetching data from server';
            }

        }
    });

});