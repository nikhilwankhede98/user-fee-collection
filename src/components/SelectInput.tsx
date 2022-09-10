import React from "react"
import { Typography, Box } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import _ from "lodash"


const SelectInput = (props: any) => {
    const {value,
        onChange,
        id,
        labelId,
        labelFormat,
        options,
        label,
        helperText,
        hideNone,
        variant,
        size,
        fullWidth = true,
        margin,
        colorTheme,
        required = true,
        valueFormat,
        object,
        disableLabelFormat,
        defaultValue,
        defaultLabel,
        InputLabelProps,
        ...otherProps} = props
    
    return (
        <FormControl
            required={required}
            variant={variant || "outlined"}
            size={size || "small"}
            fullWidth={fullWidth}
            margin={margin}
            // className={classes.borderBottom}
        >
            <InputLabel
                sx= {{
                    color: "#f2a17e",
                    fontSize: "1rem",
                    // "& .Mui-focused": {
                    //     color: "orange"
                    // }
                }}
                // classes={{
                //     focused: { color: "#27878E!important"},
                //     root: {color: themeObj?.labelTextColor
                //         ? themeObj?.labelTextColor
                //         : "#f2a17e",
                //     fontSize: "1rem"},
                // }}
                id={labelId || `select-helper-${label || "label"}`}
                // {...InputLabelProps}
            >
                {label}
            </InputLabel>
            <Select
                labelId={labelId || `select-helper-${label || "label"}`}
                id={id || "id-select-helper"}
                value={value}
                label={label}
                onChange={onChange}
                {...otherProps}
            >
                {options?.map((option, index) => {
                    return (
                        <MenuItem
                            sx= {{
                                color: "#27878E",
                                // fontSize: "0.9rem",
                                // fontWeight: 500,
                                fontSize: "0.875rem",
                                fontWeight: 400
                            }}
                            key={`${option}-${index}`}
                            dense
                            value={valueFormat ? valueFormat(option) : option}
                        >
                            {labelFormat
                                ? labelFormat(option)
                                : disableLabelFormat
                                ? option
                                : _.capitalize(_.lowerCase(option))}
                        </MenuItem>
                    );
                })}
            </Select>
        </FormControl>
    )
}

export default SelectInput
