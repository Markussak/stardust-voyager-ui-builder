import React from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"; // Adjust path if necessary

interface InGameMenuScreenProps {
    onContinue: () => void;
    onSaveGame: () => void;
    onLoadGame: () => void;
    onSettings: () => void;
    onExitToMainMenu: () => void;
    onExitToDesktop: () => void;
}

const InGameMenuScreen: React.FC<InGameMenuScreenProps> = ({
    onContinue,
    onSaveGame,
    onLoadGame,
    onSettings,
    onExitToMainMenu,
    onExitToDesktop
}) => {
    return (
        <div style={{
            position: 'fixed', top: '0', left: '0', width: '100%', height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.7)', display: 'flex',
            justifyContent: 'center', alignItems: 'center', zIndex: 100
        }}>
            <div style={{ padding: '30px', backgroundColor: '#0A0A1E', border: '1px solid #3388FF', color: 'white' }}>
                <h2>Herní Menu</h2>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li style={{ margin: '10px 0' }}><button onClick={onContinue} style={{width: '200px', padding: '10px'}}>Pokračovat ve Hře</button></li>
                    <li style={{ margin: '10px 0' }}><button onClick={onSaveGame} style={{width: '200px', padding: '10px'}}>Uložit Hru</button></li>
                    <li style={{ margin: '10px 0' }}><button onClick={onLoadGame} style={{width: '200px', padding: '10px'}}>Načíst Hru</button></li>
                    <li style={{ margin: '10px 0' }}><button onClick={onSettings} style={{width: '200px', padding: '10px'}}>Nastavení</button></li>
                    
                    <li style={{ margin: '10px 0' }}>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <button style={{width: '200px', padding: '10px'}}>Opustit do Hlavního Menu</button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Opravdu si přejete opustit do hlavního menu?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Jakýkoliv neuložený postup bude ztracen.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Ne</AlertDialogCancel>
                                    <AlertDialogAction onClick={onExitToMainMenu}>Ano</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </li>

                    <li style={{ margin: '10px 0' }}>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <button style={{width: '200px', padding: '10px'}}>Ukončit Hru (Desktop)</button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Opravdu si přejete ukončit hru?</AlertDialogTitle>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Ne</AlertDialogCancel>
                                    <AlertDialogAction onClick={onExitToDesktop}>Ano</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default InGameMenuScreen;
