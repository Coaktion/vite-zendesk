import React, {createContext, type ReactNode, useContext, useMemo, useState} from 'react';
import {type Zendesk} from '@/services';

type ContextProps = {
	zendesk: Zendesk;
	setZendesk: React.Dispatch<React.SetStateAction<Zendesk>>;
};

type Props = {
	children: ReactNode;
};

const ZendeskContext = createContext<ContextProps>({} as ContextProps);

const ZendeskProvider: React.FC<Props> = ({children}: Props) => {
	const [zendesk, setZendesk] = useState<Zendesk>({} as Zendesk);
	const contextValue = useMemo(() => ({zendesk, setZendesk}), [zendesk, setZendesk]);
	return (
		<ZendeskContext.Provider value={contextValue}>
			{children}
		</ZendeskContext.Provider>
	);
};

const useZendesk = (): ContextProps => {
	const context = useContext(ZendeskContext);
	if (!context) throw new Error('useZendesk must be used within a ZendeskProvider');
	return context;
};

export {ZendeskProvider, useZendesk};
