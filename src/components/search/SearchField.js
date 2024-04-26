import { useState, useEffect } from 'react'
import { CircularProgress, IconButton, TextField, InputAdornment, Box, Typography } from '@mui/material'
import { Done as DoneIcon } from '@mui/icons-material';
import { httpCall } from '../../helpers/HttpCall'
import getAnonymousToken from '../../helpers/auth_helper'
import TypingTextField from "../../components/search/TypingTextField";
import PromptFieldItems from "../../components/search/PromptFieldItems";
import LoadingField from "../../components/search/LoadingField";
import EnterIcon from '../theme/EnterIcon'

export default function SearchField({ className = '' }) {
    // export default function SearchField({ className = '', conversations, setConversations }) {
    const [focused, setFocused] = useState(false);
    const [typedText, setTypedText] = useState("");
    const [loading, setLoading] = useState(false);
    const [loadingLangchain, setLoadingLangchain] = useState(false);
    const [vectors, setVectors] = useState(null);
    const [langchainResult, setLangchainResult] = useState(null);
    const [jwtToken, setJwtToken] = useState(null);


    useEffect(() => {
        const initializeAuth = async () => {
            const token = await getAnonymousToken();
            setJwtToken(token)
        };

        initializeAuth();
    }, []);

    const handleInputChange = (event) => {
        let newInputValue = event.target.value
        setTypedText(newInputValue)
    }

    const queryVectors = async (newInputValue) => {
        try {
            let response = await httpCall(
                {
                    http: `${process.env.REACT_APP_API_HOST}/api/v1/queryVectors`,
                    method: "POST",
                    token: jwtToken,
                    body: { "queryString": newInputValue }
                }
            );
            if (response.error) {
                console.log(response.error)
            }
            else {
                let vecs_copy = response.data
                for (let vec of vecs_copy) {
                    vec['user_input'] = newInputValue
                }
                setVectors(vecs_copy)
                setLoading(false)
            }
        } catch (error) {
            setLoading(false);
            console.error('Fetch error:', error);
        }
    }

    const queryLangchain = async (vector) => {
        try {
            setLoadingLangchain(true)

            let response = await httpCall(
                {
                    http: `${process.env.REACT_APP_API_HOST}/api/v1/queryLangchain`,
                    method: "POST",
                    token: jwtToken,
                    body: { "vector": vector }
                }
            );

            if (response.error) {
                console.log(response.error)
            }
            else {
                setLangchainResult(response.data)

                setLoadingLangchain(false)
            }
        } catch (error) {
            setLoadingLangchain(false);
            console.error('Fetch error:', error);
        }
    }

    const handleSubmit = async (newInputValue) => {
        try {
            if (jwtToken != null) {
                setLoading(true);
                queryVectors(newInputValue)
                // setTypedText("")
            }
        } catch (error) {
            setLoading(false);
            console.error('Fetch error:', error);
        }
    }


    const handleEnterKeyPress = (event) => {
        let newInputValue = event.target.value
        if (event.key === 'Enter' && newInputValue !== '') {
            handleSubmit(newInputValue)
        }
        else if (event.key === 'Enter' && newInputValue === '') {
            setVectors(null);
            setLangchainResult(null);
        }
    }

    function strip(string) {
        return string.replace(/^\s+|\s+$/g, '');
    }

    const guidanceText1 = 'After searching '
    const guidanceText2 = 'dataset for similar mental health counseling transcripts, the following ten prompts were found. You can click the prompts to view their transcript.'

    return <>
        <Box className={`${className} my-2`}>
            <TextField
                fullWidth
                id="search-field"
                ariant="filled"
                size='small'
                value={typedText}
                onChange={handleInputChange}
                onKeyDown={handleEnterKeyPress}
                // color='junebud'
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder={"Type your thoughts here"}
                InputProps={{

                    endAdornment: (
                        <InputAdornment position='end'>
                            {(typedText !== "") && (<IconButton onClick={() => handleSubmit(typedText)}><EnterIcon /></IconButton>)}
                            {/* {(typedText !== "") && (<IconButton onClick={() => handleSubmit(typedText)}><DoneIcon color='ice' /></IconButton>)} */}
                            {loading && <CircularProgress color='ice' size={20} />}

                        </InputAdornment>
                    )
                }}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                            borderColor: 'pureapple',
                            border: 'none',
                        },
                        '& fieldset': {
                            transition: 'border-color 0.3s',
                        }
                    },
                    '& .MuiInputBase-input::placeholder': {
                        color: 'white'
                    },
                    '& .MuiInputBase-input': {
                        color: 'white'
                    }
                }}
            />
        </Box>
        {vectors && jwtToken && <Typography color={'white'} variant="caption">{guidanceText1} <a className='pair_link' href='https://lit.eecs.umich.edu/downloads.html#PAIR' target="_blank" rel="noreferrer">PAIR</a> {guidanceText2}</Typography>}
        {vectors && jwtToken && <PromptFieldItems vectors={vectors} setVectors={setVectors} queryLangchain={queryLangchain} token={jwtToken}/>}
        {vectors && jwtToken && vectors.length === 1 && <Typography color={'white'} variant="caption">Using the selected transcript and your query, lets ask the OpenAI's LLM model for suggestions.</Typography>}
        {vectors && jwtToken && vectors.length === 1 && (langchainResult ? <TypingTextField className={'searchtext'} typingEnabled={true} message={strip(langchainResult['text'])} /> : <LoadingField className='searchtext' />)}
    </>
}