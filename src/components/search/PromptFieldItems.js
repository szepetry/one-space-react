import TypingTextField from '../../components/search/TypingTextField';



function PromptFieldItems({ vectors, setVectors, queryLangchain, token }) {
    return (<div>
        {vectors.map((vector, index) => {
            return <TypingTextField
                key={index}
                idx={index}
                className={'searchtext'}
                typingEnabled={false}
                message={vector['prompt']}
                vectorMode={true}
                vectors={vectors}
                setVectors={setVectors}
                queryLangchain={queryLangchain}
                token={token}
            />;
        })}
    </div>)


}

export default PromptFieldItems;