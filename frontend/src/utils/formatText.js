const formatText = (text) => {
    return text.replace(/#(\w+)/g, '<a href="/tags/$1">#$1</a>').replace(/@(\w+)/g, '<a href="/$1">@$1</a>');
};

export default formatText