"use client";
import { Provider } from "react-redux";
import { store, persistor } from "@/lib/store";
import { PersistGate } from "redux-persist/integration/react";

const ReduxProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // const storeRef = useRef<AppStore | null>(null);

  // if (!storeRef.current) {
  //   storeRef.current = store();
  // }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default ReduxProvider;
