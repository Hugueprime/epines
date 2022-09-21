const url = window.location.href;
if (isIntraAssistantUrl()) {
    mainIntraAssistant();
} else if (isIonisxUrl()) {
    mainIonisx();
}