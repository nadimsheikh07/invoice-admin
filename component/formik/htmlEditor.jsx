import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Editor } from '@tinymce/tinymce-react';


const TextBox = (props) => {
    const { name, label, value, fullWidth, helperText, disabled } = props
    return (
        <FormControl
            key={`key${name}`}
            error={helperText ? true : false}
            fullWidth={fullWidth}
        >
            <InputLabel>{label}</InputLabel>


            <Editor
                apiKey='6sklm89y7um3fi0i4futimsf1eq8v63jmbhddgeo88v9wqza'
                disabled={disabled}
                value={value}
                init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar:
                        'undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help'
                }}
                onEditorChange={e => props.onChange(e)}
            />

            {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    )
}

export default TextBox;