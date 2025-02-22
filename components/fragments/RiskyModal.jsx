import Modal from "@/components/fragments/Modal";
import { useMessageText } from "@/hooks/useMessageText";
import Message from "@/components/fragments/Message";
import { useRouter } from 'next/navigation'

export default function RiskyModal( {url, modalRef} ) {
    
    const router = useRouter()
    const getText = useMessageText();
    

    function onHandleSubmit() {
        router.push(url, { scroll: false })
	}
    
    return ( <Modal
        title={getText(["commons", "riskyUrl", "title"])}
        submit={true}
        onSubmit={onHandleSubmit}
        ref={modalRef}
        cancelText={getText(["commons", "riskyUrl", "back"])}
        submitText={getText(["commons", "riskyUrl", "accept"])}
    >
        <>
            <Message code={["commons", "riskyUrl", "desc"]}></Message>
            <p className="font-bold"> <Message code={["commons", "riskyUrl", "to"]}></Message> <span className="text-[--myColorStartSimple]">{url}</span></p>
        </>
    </Modal> )
}