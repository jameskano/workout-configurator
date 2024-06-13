export interface PopoverContextType {
	popoverOpen: boolean;
	popoverContent: string | React.ReactNode;
	popoverAnchorElement: Element | null;
	setPopoverOpen: (value: boolean) => void;
	setPopoverContent: (value: string | React.ReactNode) => void;
	setPopoverAnchorElement: (value: Element) => void;
	closePopoverHandler: () => void;
	openPopoverHandler: (target: Element, content: string | React.ReactNode) => void;
}
