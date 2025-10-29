const highlightText = (text: string, query: string) => {
    if (!query) return text;

    const index = text.toLowerCase().indexOf(query.toLowerCase());
    if (index === -1) return text;

    const beforeMatch = text.slice(0, index);
    const match = text.slice(index, index + query.length);
    const afterMatch = text.slice(index + query.length);

    return (
        <span>
            {beforeMatch}
            <span className='bg-[#2E77D0]'>{match}</span>
            {afterMatch}
        </span>
    );
};

export {
    highlightText
}