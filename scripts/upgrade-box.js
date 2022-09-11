const { ethers } = require("hardhat")

async function main() {
    const boxProxyAdmin = await ethers.getContract("BoxProxyAdmin")
    const transparentProxy = await ethers.getContract("Box_Proxy")

    //Initial Verison
    const proxyBoxV1 = await ethers.getContractAt("Box", transparentProxy.address)
    const versionInitial = await proxyBoxV1.version()
    console.log(versionInitial.toString())

    const boxV2 = await ethers.getContract("BoxV2")
    const upgradeTx = await boxProxyAdmin.upgrade(transparentProxy.address, boxV2.address)
    await upgradeTx.wait(1)

    //In order to work with BoxV2 contract we need the ABI and load it to the transparent proxy address
    const proxyBoxV2 = await ethers.getContractAt("BoxV2", transparentProxy.address)
    const versionFinal = await proxyBoxV2.version()
    console.log(versionFinal.toString())
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
