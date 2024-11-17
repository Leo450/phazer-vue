export const useDurationFormat = (durationMS, digits = 1, format = '{minutes}m{seconds}') => {
    const showMinutes = format.includes('{minutes}')
    const duration = durationMS / 1000
    const minutes = Math.floor(duration / 60)
    const seconds = showMinutes ? duration % 60 : duration
    
    if (showMinutes && minutes === 0) {
        format = format
            .replace('{minutes}m', '')
            .replace('{minutes} ', '')
            .replace('{minutes}:', '')
            .replace('{minutes} :', '')
            .replace('{minutes}', '')
    }
    
    return format
        .replace('{minutes}', minutes.toString())
        .replace('{seconds}', !showMinutes || minutes === 0 ? seconds.toFixed(digits) : seconds.toFixed(0))
        .trim()
}