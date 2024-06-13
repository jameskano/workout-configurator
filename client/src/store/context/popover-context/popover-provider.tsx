import { useMemo, useState } from 'react';
import { PopoverContext } from './popover-context';

export const PopoverProvider = ({ children }: { children: React.ReactNode }) => {
	const [popoverOpen, setPopoverOpen] = useState(false);
	const [popoverContent, setPopoverContent] = useState<string | React.ReactNode>('');
	const [popoverAnchorElement, setPopoverAnchorElement] = useState<Element | null>(null);

	const openPopoverHandler = (target: Element, content: string | React.ReactNode) => {
		setPopoverAnchorElement(target);
		setPopoverContent(content);
		setPopoverOpen(true);
	};

	const closePopoverHandler = () => {
		setPopoverOpen(false);
		setPopoverAnchorElement(null);
		setPopoverContent('');
	};

	const value = useMemo(
		() => ({
			popoverOpen,
			setPopoverOpen,
			popoverContent,
			setPopoverContent,
			popoverAnchorElement,
			setPopoverAnchorElement,
			closePopoverHandler,
			openPopoverHandler,
		}),
		[popoverOpen, popoverContent, popoverAnchorElement],
	);

	return <PopoverContext.Provider value={value}>{children}</PopoverContext.Provider>;
};
