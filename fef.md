###　feflow常用命令

####  安装
```
npm install @feflow/cli -g
```

#### 命令补充

1. 0.19.0-alpha.3 版本已经支持，详情可运行 fef config -h 查看
   - 永久禁止更新：
   ```
   fef config set disableCheck false 
   ```
   - 单次禁止更新，运行命令时在后面加上 --disable-check：
   ```
   fef <commands> --disable-check 
   ```
	

2. 开启自动更新

   ```
   fef config set autoUpdate true
   ```

   


