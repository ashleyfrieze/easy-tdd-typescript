export type ResetButtonProps = {
    name?: string;
    resetAction: () => void;
};

export function ResetButton({name, resetAction}: ResetButtonProps) {
    return <button onClick={resetAction} >Reset{name ? ` ${name}`: ''}</button>
}