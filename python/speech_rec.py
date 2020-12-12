import speech_recognition as sr

r = sr.Recognizer()

def recognise():
    with sr.Microphone() as source:
        r.adjust_for_ambient_noise(source)
        audio = r.listen(source)

    try:
        return(r.recognize_google(audio))
    except:
        return "Error"

print(recognise())