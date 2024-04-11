// @ts-ignore
import React, { useState, useEffect } from "react";
import { neos } from "@neos-project/neos-ui-decorators";
import * as stylex from "@stylexjs/stylex";
import { colors, sizes, transitions, fonts } from "./Tokens.stylex";

const neosifier = neos((globalRegistry) => ({
    config: globalRegistry.get("frontendConfiguration").get("Carbon.Tailwind:Spacing"),
}));

const defaultOptions = {
    disabled: false,
    scale: 4,
};

const styles = stylex.create({
    disabled: {
        cursor: "not-allowed",
        opacity: 0.65,
        ":where(*) *": {
            pointerEvents: "none !important",
        },
    },
    highlight: {
        boxShadow: `0 0 0 2px ${colors.warn}`,
    },
    rangeSlider: {
        width: "100%",
        height: sizes.input,
        appearance: "none",
        borderRadius: sizes.borderRadius,
        border: 0,
        outline: "none",
        backgroundColor: colors.contrastNeutral,

        "::-webkit-slider-thumb": {
            appearance: "none",
            backgroundColor: colors.primaryBlue,
            boxShadow: "0 0 0 #000, 0 0 0 #0d0d0d",
            cursor: "grab",
            height: 20,
            width: 20,
            borderWidth: 0,
            borderRadius: sizes.borderRadius,
            transitionProperty: "transform, background-color",
            transitionTimingFunction: transitions.timing,
            transitionDuration: transitions.default,

            ":hover": {
                backgroundColor: colors.primaryBlueHover,
            },
            ":focus": {
                backgroundColor: colors.primaryBlueHover,
            },
            ":active": {
                cursor: "grabbing",
                transform: "scale(1.2)",
            },
        },
        "::-moz-range-thumb": {
            appearance: "none",
            backgroundColor: colors.primaryBlue,
            boxShadow: "0 0 0 #000, 0 0 0 #0d0d0d",
            cursor: "grab",
            height: 20,
            width: 20,
            borderWidth: 0,
            borderRadius: sizes.borderRadius,
            transitionProperty: "transform, background-color",
            transitionTimingFunction: transitions.timing,
            transitionDuration: transitions.default,

            ":hover": {
                backgroundColor: colors.primaryBlueHover,
            },
            ":focus": {
                backgroundColor: colors.primaryBlueHover,
            },
            ":active": {
                cursor: "grabbing",
                transform: "scale(1.2)",
            },
        },
    },
    explanation: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        fontFamily: fonts.mono,
        fontSize: fonts.size,
    },
    button: (currentValue, targetValue) => ({
        padding: 0,
        margin: 0,
        background: "transparent",
        appearance: "none",
        borderWidth: 0,
        cursor: "pointer",
        color: "inherit",
        opacity: currentValue === targetValue ? 1 : 0.7,
    }),
    outputValue: (currentValue, maxValue) => ({
        padding: 0,
        margin: 0,
        visibility: currentValue === 0 || currentValue === maxValue ? "hidden" : null,
    }),
    outputField: {
        backgroundColor: colors.contrastDarkest,
        borderWidth: 1,
        borderRadius: sizes.borderRadius,
        marginTop: sizes.spacingHalf,
        paddingBlock: sizes.spacingFull,
    },
    outputLine: (height) => ({
        height: height,
        backgroundColor: colors.primaryBlue,
        transition: `height ${transitions.slow} ${transitions.timing}`,
    }),
});

function Editor(props) {
    const options = { ...defaultOptions, ...props.config, ...props.options };
    const { commit, highlight, id } = props;
    const spacing = options.spacing.map((value) => value.toString());
    const value = props?.value || 0;
    const [index, setIndex] = useState(spacing.indexOf(value));
    const maxIndex = spacing?.length - 1 || 0;

    useEffect(() => {
        commit(spacing[index]);
    }, [index]);

    function handleChange({ target }) {
        setIndex(target.valueAsNumber);
    }

    const minValue = spacing[0];
    const maxValue = spacing[maxIndex];

    const outputValue = (value) => {
        if (!value) {
            return "0";
        }
        const pixel = value == "px" ? 1 : parseFloat(value) * options.scale;
        return `${pixel}px`;
    };

    return (
        <div {...stylex.props(options?.disabled && styles.disabled)}>
            <input
                {...stylex.props(styles.rangeSlider, highlight && styles.highlight)}
                type="range"
                min={0}
                max={maxIndex}
                step={1}
                value={index}
                onChange={handleChange}
                id={id}
            />
            <div {...stylex.props(styles.explanation)}>
                <button {...stylex.props(styles.button(index, 0))} type="button" onClick={() => setIndex(0)}>
                    {outputValue(minValue)}
                </button>
                <output {...stylex.props(styles.outputValue(index, maxIndex))}>{outputValue(value)}</output>
                <button
                    {...stylex.props(styles.button(index, maxIndex))}
                    type="button"
                    onClick={() => setIndex(maxIndex)}
                >
                    {outputValue(maxValue)}
                </button>
            </div>
            <div {...stylex.props(styles.outputField)}>
                <div {...stylex.props(styles.outputLine(outputValue(value)))}></div>
            </div>
        </div>
    );
}

export default neosifier(Editor);
