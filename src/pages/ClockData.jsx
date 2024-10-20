import CenteredButton from '../components/CenteredButton';
import ClockDataFileUpload from '../components/ClockDataFileUpload';

export default function ClockData() {
    return (
        <>
        <ClockDataFileUpload 
            config={{
                label: 'Cargar información de reloj',
                accept: '.txt',
                handleUpload: () => {
                    console.log('Clock data upload triggered!');
                }
            }} 
        />
        <CenteredButton buttonLabel="Volver a inicio" targetPath="/" />
        </>
    )
}