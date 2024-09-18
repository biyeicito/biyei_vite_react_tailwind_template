

RegisterCommand('OpenNUI', function()
    OpenNUI()
end)

OpenNUI = function()
    SendNUIMessage({
        action = 'show',
        status = true
    })
end
