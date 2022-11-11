/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly REACT_APP_AOPSFUNCTION: string;
  readonly REACT_APP_FIREBASECONFIG: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
