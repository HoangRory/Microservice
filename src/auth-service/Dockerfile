# Giai đoạn build
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copy file csproj và restore
COPY ["auth-service.csproj", "./"]
RUN dotnet restore "auth-service.csproj"

# Copy toàn bộ mã nguồn và publish
COPY . .
RUN dotnet publish "auth-service.csproj" -c Release -o /app/publish

# Giai đoạn runtime
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .

EXPOSE 80
ENTRYPOINT ["dotnet", "auth-service.dll"]
