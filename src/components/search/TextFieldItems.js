import TypingTextField from '../../components/search/TypingTextField';



function TextFieldItems({ conversations }) {
    return (<div>
        {conversations.map((conversation, index) => {
            const { className, typingEnabled, message, color } = conversation;

            return <TypingTextField className={className} typingEnabled={typingEnabled} message={message} color={color} />;
        })}
    </div>)


}

export default TextFieldItems;