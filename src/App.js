import React, { useEffect, useState } from 'react';
import './App.css';
import { Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import { decrypt, encrypt } from './lib';
import { CopyToClipboard } from 'react-copy-to-clipboard';

function App() {
    const [state, setState] = useState({
        apiKey: '',
        apiSecret: '',
        salt: '--==S4lT==--',
        result: '',
        decrypted: '',
        copied: false
    });
    const { apiKey, apiSecret, salt, result, decrypted, copied } = state;

    const handleChange = (name) => (e) => {
        setState({
            ...state,
            [name]: e.target.value
        });
    };

    useEffect(() => {
        if (copied) {
            setTimeout(() => {
                setState({
                    ...state,
                    copied: false
                });
            }, 4000);
        }
    }, [copied]);

    useEffect(() => {
        let encrypted = result;
        let plain = decrypted;

        if (apiKey && apiSecret) {
            const primble = `${apiKey}:${apiSecret}`;
            encrypted = encrypt(primble, salt);
        }

        if (encrypted) {
            plain = decrypt(encrypted, salt);
        }

        setState({
            ...state,
            result: encrypted,
            decrypted: plain
        });
    }, [apiKey, apiSecret, salt]);

    return (
        <Container>
            <Paper>
                <p>Encrypt string with custom salt</p>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' }
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <Grid container>
                        <Grid item xs={12}>
                            <TextField
                                value={apiKey}
                                onChange={handleChange('apiKey')}
                                label="API - key"
                                variant="outlined"
                            />
                            <TextField
                                value={apiSecret}
                                onChange={handleChange('apiSecret')}
                                label="API - secret"
                                variant="outlined"
                            />
                            <TextField
                                onChange={handleChange('salt')}
                                value={salt}
                                label="Salt"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <CopyToClipboard
                                text={result}
                                onCopy={() =>
                                    setState({ ...state, copied: true })
                                }
                            >
                                <Button variant="text">Copy</Button>
                            </CopyToClipboard>
                            {copied && (
                                <Typography style={{ color: 'green' }}>
                                    Copied to clipboard
                                </Typography>
                            )}

                            <Container>
                                Result:
                                <Typography style={{ width: '100%' }}>
                                    {result}
                                </Typography>
                            </Container>
                        </Grid>
                        {/* <Grid item xs={12}>
                            <Container>
                                Decrypted:
                                <Typography style={{ width: '100%' }}>
                                    {decrypted}
                                </Typography>
                            </Container>
                        </Grid> */}
                    </Grid>
                </Box>
            </Paper>
        </Container>
    );
}

export default App;
