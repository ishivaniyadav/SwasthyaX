    const scriptURL = 'https://script.google.com/macros/s/AKfycbzBT6Y52dYUIUZ4v3G0wyF7qUCNY1wnpdELKMbagbVU194MjNCvPU5mUUlndB3ntb1vKw/exec'
    const form = document.forms['contact-form']
    form.addEventListener('submit', e => {
        e.preventDefault()
        fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(response => alert("Thank you! your form is submitted successfully." ))
        .then(() => { window.location.reload(); })
        .catch(error => console.error('Error!', error.message))
    })
    const diseaseDataset = [
        { disease: "Flu", symptoms: ["fever", "cough", "sore throat", "body aches", "fatigue"] },
        { disease: "Cold", symptoms: ["cough", "runny nose", "sneezing", "sore throat", "fatigue"] },
        { disease: "Allergy", symptoms: ["sneezing", "itchy eyes", "runny nose", "cough", "skin rash"] },
        { disease: "Covid-19", symptoms: ["fever", "dry cough", "tiredness", "aches and pains", "sore throat"] },
        { disease: "Gastroenteritis", symptoms: ["diarrhea", "vomiting", "stomach cramps", "fever", "headache"] },
        { disease: "Pneumonia", symptoms: ["cough", "fever", "difficulty breathing", "chest pain", "fatigue"] },
        { disease: "Asthma", symptoms: ["shortness of breath", "chest tightness", "wheezing", "cough", "difficulty sleeping"] },
        { disease: "Tuberculosis", symptoms: ["cough", "weight loss", "fever", "night sweats", "fatigue"] },
        { disease: "Liver Cirrhosis", symptoms: ["fatigue", "easy bruising", "swelling in legs", "jaundice", "abdominal pain"] },
        { disease: "Diabetes", symptoms: ["increased thirst", "frequent urination", "extreme hunger", "fatigue", "blurry vision"] },
        { disease: "Heart Disease", symptoms: ["chest pain", "shortness of breath", "nausea", "fatigue", "lightheadedness"] },
        { disease: "Anemia", symptoms: ["fatigue", "weakness", "pale skin", "dizziness", "cold hands and feet"] },
        { disease: "Hypertension", symptoms: ["headaches", "shortness of breath", "nosebleeds", "flushing", "vision changes"] },
        { disease: "Lung Cancer", symptoms: ["cough", "chest pain", "weight loss", "fatigue", "hoarseness"] },
        { disease: "Celiac Disease", symptoms: ["abdominal pain", "bloating", "diarrhea", "weight loss", "fatigue"] },
        { disease: "Influenza", symptoms: ["fever", "chills", "cough", "sore throat", "body aches"] },
        { disease: "Chronic Bronchitis", symptoms: ["cough", "mucus production", "wheezing", "shortness of breath"] },
        { disease: "Sinusitis", symptoms: ["facial pain", "nasal congestion", "headache", "fever", "cough"] },
        { disease: "Kidney Stones", symptoms: ["severe pain", "nausea", "vomiting", "frequent urination"] },
        { disease: "Urinary Tract Infection", symptoms: ["burning sensation during urination", "frequent urination", "cloudy urine"] },
        { disease: "Eczema", symptoms: ["dry skin", "itching", "red patches", "inflammation"] },
        { disease: "Psoriasis", symptoms: ["red patches", "dry skin", "itchy skin", "thickened skin"] },
        { disease: "Gout", symptoms: ["intense joint pain", "swelling", "redness", "tenderness"] },
        { disease: "Hepatitis", symptoms: ["fatigue", "nausea", "abdominal pain", "dark urine"] },
        { disease: "Stroke", symptoms: ["sudden numbness", "confusion", "trouble speaking", "severe headache"] },  
    ];
    const recommendations = {
        "Flu": "Rest and stay hydrated. Consider over-the-counter medications to relieve symptoms.",
        "Cold": "Stay hydrated, rest, and consider over-the-counter medications to alleviate symptoms.",
        "Allergy": "Avoid allergens, use antihistamines, and consult an allergist for personalized advice.",
        "Covid-19": "Isolate yourself and consult a healthcare provider for testing and advice.",
        "Gastroenteritis": "Stay hydrated, rest, and consult a healthcare provider if symptoms worsen.",
        "Pneumonia": "Seek medical attention, rest, and stay hydrated. Antibiotics may be needed.",
        "Asthma": "Use an inhaler as prescribed, avoid triggers, and consult a healthcare provider.",
        "Tuberculosis": "Seek medical treatment immediately; it requires antibiotics.",
        "Liver Cirrhosis": "Consult a healthcare provider for management options and lifestyle changes.",
        "Diabetes": "Manage diet, monitor blood sugar levels, and consult a healthcare provider.",
        "Heart Disease": "Consult a cardiologist for a proper assessment and treatment plan.",
        "Anemia": "Eat iron-rich foods and consult a healthcare provider for treatment options.",
        "Hypertension": "Monitor your blood pressure, exercise, and consult a healthcare provider.",
        "Lung Cancer": "Consult an oncologist for further evaluation and treatment options.",
        "Celiac Disease": "Avoid gluten-containing foods and consult a healthcare provider.",
        "Influenza": "Rest, stay hydrated, and consult a healthcare provider if symptoms worsen.",
        "Chronic Bronchitis": "Avoid irritants, consult a healthcare provider for management options.",
        "Sinusitis": "Stay hydrated, use saline nasal sprays, and consult a healthcare provider.",
        "Kidney Stones": "Stay hydrated, avoid high-oxalate foods, and consult a healthcare provider.",
        "Urinary Tract Infection": "Stay hydrated and consult a healthcare provider for antibiotics.",
        "Eczema": "Use moisturizers, avoid irritants, and consult a dermatologist if needed.",
        "Psoriasis": "Consult a dermatologist for treatment options and management.",
        "Gout": "Stay hydrated, avoid high-purine foods, and consult a healthcare provider.",
        "Hepatitis": "Consult a healthcare provider for management and treatment options.",
        "Stroke": "Call emergency services immediately; time is critical in case of stroke.",
    };
    const symptomsGrid = document.getElementById('symptoms-grid');
    const uniqueSymptoms = new Set();
    diseaseDataset.forEach(disease => {
        disease.symptoms.forEach(symptom => {
            if (!uniqueSymptoms.has(symptom)) {
                uniqueSymptoms.add(symptom);
                const symptomItem = document.createElement('div');
                symptomItem.classList.add('symptom-item');
                symptomItem.innerHTML = `<input type="checkbox" class="symptom-checkbox" value="${symptom}"> ${symptom}`;
                symptomsGrid.appendChild(symptomItem);
            }
        });
    });
    document.getElementById('diagnosis-form').addEventListener('submit', function (e) {
        e.preventDefault();
        const selectedSymptoms = Array.from(document.querySelectorAll('.symptom-checkbox:checked')).map(el => el.value);
        if (selectedSymptoms.length === 0) {
            document.getElementById('result-text').textContent = "Please select at least one symptom.";
            document.getElementById('diagnosis-result').style.display = 'block';
            return;
        }
        const diagnosedDiseases = diseaseDataset.filter(disease => 
            selectedSymptoms.some(symptom => disease.symptoms.includes(symptom))
        );
        if (diagnosedDiseases.length > 0) {
            const resultText = diagnosedDiseases.map(disease => {
                return `${disease.disease}`;
            }).join('\n');
            document.getElementById('result-text').textContent = `Predicted Diseases:\n${resultText}`;
            document.getElementById('diagnosis-result').style.display = 'block';
            const additionalSymptoms = new Set();
            diagnosedDiseases.forEach(disease => {
                disease.symptoms.forEach(symptom => {
                    if (!selectedSymptoms.includes(symptom)) {
                        additionalSymptoms.add(symptom);
                    }
                });
            });
            const additionalSymptomsGrid = document.getElementById('additional-symptoms-grid');
            additionalSymptomsGrid.innerHTML = '';
            additionalSymptoms.forEach(symptom => {
                const symptomItem = document.createElement('div');
                symptomItem.classList.add('symptom-item');
                symptomItem.innerHTML = `<input type="checkbox" class="additional-symptom-checkbox" value="${symptom}"> ${symptom}`;
                additionalSymptomsGrid.appendChild(symptomItem);
            });
            document.getElementById('additional-symptoms-section').style.display = additionalSymptoms.size > 0 ? 'block' : 'none';
        } else {
            document.getElementById('result-text').textContent = "No diseases predicted. Please consult a doctor.";
            document.getElementById('diagnosis-result').style.display = 'block';
        }
    });
    document.getElementById('get-final-diagnosis').addEventListener('click', function () {
        const additionalSymptoms = Array.from(document.querySelectorAll('.additional-symptom-checkbox:checked')).map(el => el.value);
        const finalDiagnosedDiseases = diseaseDataset.filter(disease =>
            additionalSymptoms.some(symptom => disease.symptoms.includes(symptom))
        );
        let bestMatchDisease = null;
        let maxSymptomsMatched = 0;
        finalDiagnosedDiseases.forEach(disease => {
            const symptomsMatched = disease.symptoms.filter(symptom => additionalSymptoms.includes(symptom)).length;
            if (symptomsMatched > maxSymptomsMatched) {
                maxSymptomsMatched = symptomsMatched;
                bestMatchDisease = disease;
            }
        });
        if (bestMatchDisease) {
            document.getElementById('final-result-text').textContent = `Final Predicted Disease: ${bestMatchDisease.disease}`;
            document.getElementById('recommendation-text').innerText = `Recommendations: ${recommendations[bestMatchDisease.disease] || "\nConsult a healthcare provider."}`;
            document.getElementById('final-diagnosis-result').style.display = 'block';
        } else {
            document.getElementById('final-result-text').textContent = "No additional diseases predicted. Please consult a doctor.";
            document.getElementById('final-diagnosis-result').style.display = 'block';
        }
    });

    const scrollContainer = document.querySelector('.disease-scroll-container');
    const scrollLeft = document.getElementById('scroll-left');
    const scrollRight = document.getElementById('scroll-right');

    scrollLeft.addEventListener('click', () => {
        scrollContainer.scrollBy({
            left: -300, 
            behavior: 'smooth',
        });
    });

    scrollRight.addEventListener('click', () => {
        scrollContainer.scrollBy({
            left: 300, 
            behavior: 'smooth',
        });
    });
