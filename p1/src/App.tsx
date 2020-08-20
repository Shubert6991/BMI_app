import React ,{useRef,useState} from 'react';
import { IonApp, IonHeader, IonContent, IonToolbar, IonTitle, IonGrid, IonRow, IonCol, IonItem, IonLabel, IonInput, IonAlert } from '@ionic/react';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

/* custom components */ 
import BmiControls from './components/BmiControls';
import BmiResult from './components/BmiResult';
import InputControl from './components/InputControl';

const App: React.FC = () => {
  const [ calculatedBmi, setCalculatedBmi] = useState<number>();
  const [ error,setError ] = useState<string>();
  const [ units,setUnits] = useState<'mkg'|'ftlbs'>('mkg');
  
  const weightInputRef = useRef<HTMLIonInputElement>(null);
  const heightInputRef = useRef<HTMLIonInputElement>(null);

  const calculateBMI = () => {
    const enteredWeight = weightInputRef.current?.value
    const enteredHeight = heightInputRef.current?.value

    if(!enteredWeight || !enteredHeight || +enteredWeight<=0 || +enteredHeight<=0){
      setError("Please enter valid (non-negative) input number");
      return;
    }

    const factorW = units === "mkg" ? 1 : 2.2;
    const factorH = units === "mkg" ? 1 : 3.28;

    const weight = +enteredWeight / factorW;
    const height = +enteredHeight / factorH;

    //bmi = weight/height^2
    const bmi = weight / (height * height);

    console.log(bmi)
    setCalculatedBmi(bmi)
  }

  const resetInputs = () => {
    weightInputRef.current!.value = ""
    heightInputRef.current!.value = ""
  }

  const clearError = () => {
    setError('');
  }

  const selectUnitsHandler = (selectedValue: 'mkg' | 'ftlbs') =>{
    setUnits(selectedValue);
  }

  return (
    <React.Fragment>
      <IonAlert isOpen={!!error} message={error} buttons={[{text: 'Okay',handler:clearError }]}/>
      <IonApp>
        <IonHeader>
          <IonToolbar>
            <IonTitle>BMI calculator</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonGrid>
            {/* units control */}
            <IonRow>
              <IonCol>
                <InputControl selectedValue={units} onSelectValue={selectUnitsHandler}/>
              </IonCol>
            </IonRow>
            {/* input Height */}
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">
                    Height ({units === "mkg" ? 'm' : 'ft'})
                    </IonLabel>
                  <IonInput type="number" ref={heightInputRef}></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            {/* input Weight */}
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">
                    Weight ({units === "mkg" ? 'kg' : 'lbs'})
                    </IonLabel>
                  <IonInput type="number" ref={weightInputRef}></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <BmiControls onCalculate={calculateBMI} onReset={resetInputs}/>
            {/* Result */}
            {calculatedBmi && (
            <BmiResult result={calculatedBmi}></BmiResult>
            )}
          </IonGrid>
        </IonContent>
      </IonApp>
    </React.Fragment>
  )
};

export default App;
