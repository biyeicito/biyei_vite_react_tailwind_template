

RegisterCommand('OpenNUI', function()
    OpenNUI()
end)

OpenNUI = function()
    SetNuiFocus(true, true)
    SendNUIMessage({
        action = 'show',
        status = true
    })
end


CloseNUI = function()
    SetNuiFocus(false, false)
    SendNUIMessage({
        action = 'show',
        status = false
    })
end


RegisterNUICallback('getCoordinates', function(data, cb)
    local playerPed = PlayerPedId()
    local coords = GetEntityCoords(playerPed) 
    
    cb({
      x = coords.x,
      y = coords.y,
      z = coords.z
    })
  
end)

RegisterNUICallback('CloseNUI', function()
    CloseNUI()
end)