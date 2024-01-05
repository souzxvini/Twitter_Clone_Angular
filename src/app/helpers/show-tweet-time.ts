export const showTweetTime = (tweetTime: Date, nowTime: Date) => {
    const postTime = new Date(tweetTime);
    const currentTime = new Date(nowTime);
    const timeDiff = currentTime.getTime() - postTime.getTime();

    // Convertendo a diferença de tempo em segundos
    const seconds = timeDiff / 1000;

    if (seconds < 60) {
        // Menos de 60 segundos
        return `${Math.floor(seconds)}s`;
    } else if (seconds < 3600) {
        // Entre 1 minuto e 59 minutos
        const minutes = seconds / 60;
        return `${Math.floor(minutes)} min`;
    } else if (seconds < 86400) {
        // Entre 1 hora e 23 horas 59 minutos
        const hours = seconds / 3600;
        return `${Math.floor(hours)}h`;
    } else {
        // Mais de 23 horas 59 minutos
        if (localStorage.getItem('Language')) { // Se existir 'Language' no localstorage
            switch (localStorage.getItem('Language')) {
                case 'en':
                    return postTime.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });


                default:
                    return postTime.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' });

            }
        } else {
            return postTime.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' });

        }
    }
};