# Build phase
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY ["auth-service.csproj", "./"]
RUN dotnet restore "auth-service.csproj"

COPY . .
RUN dotnet publish "auth-service.csproj" -c Release -o /app/publish

# Runtime phase
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .

EXPOSE 80
ENTRYPOINT ["dotnet", "auth-service.dll"]
