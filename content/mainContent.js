const url = window.location.href;

if (isIntraAssistantUrl()) {
    mainIntraAssistant();
} else if (isIonisxUrl()) {
    mainIonisx();
} else if (isDebugProUrl()) {
    mainDebugPro();
} else if (isMoodleUrl()) {
    mainMoodle();
}