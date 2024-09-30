import React, { useEffect, useRef } from 'react';
import { initialise } from '@open-ic/openchat-xframe';

function OpenChatFrame({ path = '/community/rfeib-riaaa-aaaar-ar3oq-cai/channel/334961401678552956581044255076222828441', theme = 'dark' }) {
  const iframeRef = useRef(null);
  const clientRef = useRef(null);

  useEffect(() => {
    console.log('Montando OpenChatFrame...');
    const initOpenChat = async () => {
      if (iframeRef.current) {
        console.log('Inicializando OpenChat en el iframe...');
        const client = await initialise(iframeRef.current, {
          targetOrigin: 'https://oc.app',
          initialPath: path,
          theme: {
            name: 'my-app-theme',
            base: theme,
            overrides: {
              primary: "green",
              bd: 'rgb(91, 243, 190)',
              bg: 'transparent',
              txt: "black",
              placeholder: "green",
              'txt-light': '#75c8af',
              timeline: {
                txt: "yellow"
              }
              // Se puede añadir más overrides aquí según sea necesario
            }
          },
          
        });
        clientRef.current = client;
      }
    };

    initOpenChat();
  }, [path, theme]);

  return (
    <div className="fixed bottom-4 right-4 w-80 h-[100px] z-50">
      <iframe
        ref={iframeRef}
        title="OpenChat Frame"
        className="w-full h-full rounded-lg opacity-80"
        style={{ width: '15em', height: '18em', border: 'none' }}
      />
    </div>
  );
}

export default OpenChatFrame;