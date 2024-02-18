-- CreateTable
CREATE TABLE `issues` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `status` ENUM('OPEN', 'IN_PROGRESS', 'CLOSED') NOT NULL DEFAULT 'OPEN',
    `createdAt` DATETIME(0) NULL,
    `updatedAt` DATETIME(0) NULL,
    `deleted_flag` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_name` VARCHAR(15) NOT NULL,
    `password` BLOB NOT NULL,

    UNIQUE INDEX `id`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
