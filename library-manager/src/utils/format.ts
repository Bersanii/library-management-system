export function formatDateInput(value: string) {
    // Remove tudo que não é número
    const digits = value.replace(/\D/g, "").slice(0, 8);

    // Monta a data com slashes automaticamente
    if (digits.length <= 2) {
        return digits;
    } else if (digits.length <= 4) {
        return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    } else {
        return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
    }
};

export function getStatusDesc(status: String) {
    if (status == 'empr')
        return 'Emprestado';
    else
        return 'Disponível'
}