<template>
    <div id="preloader">
        <div id="loader"></div>
    </div>
</template>

<style>
#preloader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999999;
    display: flex;
    justify-content: center;
    align-items: center;
}

#loader {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 3px solid transparent;
    border-top-color: orange;
    animation: spin 2s linear infinite;
    position: relative;
}

#loader:before,
#loader:after {
    content: "";
    position: absolute;
    top: 5px;
    left: 5px;
    right: 5px;
    bottom: 5px;
    border-radius: 50%;
    border: 3px solid transparent;
}

#loader:before {
    border-top-color: #8f6ed5;
    animation: spin 3s linear infinite;
}

#loader:after {
    top: 15px;
    left: 15px;
    right: 15px;
    bottom: 15px;
    border-top-color: #2394F2;
    animation: spin 1.5s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
